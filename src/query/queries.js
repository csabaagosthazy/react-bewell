import { client } from '../sanityClient';

const sectionQuery = `*[
  _type == "section" &&
  count(*[_type == "post" && references(^._id)]) > 0
]`;

const postQuery = `
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          slug,
          publishedAt,
          visibleLanguages,
          textPosition,
          extraContent,
          "title": title,
          "body": body,
          "images": mainImage[]{
            asset->{
              _id,
              url,
              metadata { lqip, dimensions }
            },
            shortDescription
          },
          "mainVideo": mainVideo{
            video{
              asset->{
                _id,
                url
              }
            },
            caption
          },
          section->{
            _id,
            "title": title,
            slug
          }
        }
      `;

const prepareSections = (fetchSectionsResult, lang) => {
  const titlesToshow = [];
  const excludedSlugs = ['kezdolap', 'impresszum'];
  console.log('Fetched sections:', fetchSectionsResult);
  fetchSectionsResult.forEach((section) => {
    if (section.title[lang] && !excludedSlugs.includes(section.slug.current)) {
      titlesToshow.push({
        title: section.title[lang],
        slug: section.slug.current,
        order: section.order || 99,
      });
    }
  });
  titlesToshow.sort((a, b) => a.order - b.order);
  return titlesToshow;
};

export const fetchSections = (lang) => {
  return client
    .fetch(sectionQuery)
    .then((sections) => prepareSections(sections, lang));
};

const preparePosts = (fetchPostsResult, lang) => {
  const postsToShow = [];
  console.log('Fetched posts:', fetchPostsResult);
  fetchPostsResult.forEach((post) => {
    if (post.visibleLanguages.includes(lang)) {
      const preparedPost = {
        id: post._id,
        title: post.title?.[lang] || null,
        section: post.section?.title?.[lang] || null,
        sectionSlug: post.section?.slug?.current || null,
        images: post.images || [],
        videoUrl: post.mainVideo?.video?.asset?.url || null,
        videoCaption: post.mainVideo?.caption || null,
        body: post.body?.[lang] || null,
        extraContent: post.extraContent?.[lang] || null,
        textPosition: post.textPosition || null,
        publishedAt: post.publishedAt,
      };
      postsToShow.push(preparedPost);
    }
  });
  return postsToShow;
};

export const fetchPosts = (lang) => {
  return client.fetch(postQuery).then((posts) => preparePosts(posts, lang));
};

// select only sections with posts
// filter home and imprint section from sections
// if there is no home section post, set home default section
// same with imprint section
