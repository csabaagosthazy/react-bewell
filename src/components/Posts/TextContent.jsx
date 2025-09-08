import { PortableText } from '@portabletext/react';

const customComponents = {
  marks: {
    em: ({ children }) => (
      <em className='text-gray-600 font-semibold'>{children}</em>
    ),
    strong: ({ children }) => (
      <strong className='text-gray-800 font-bold'>{children}</strong>
    ),
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' && 'noindex nofollow'}
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <>
        <p style={{ margin: 0 }}>{children}</p>
        <div style={{ marginBottom: '0.8rem' }} />
      </>
    ),
    h1: ({ children }) => <h1 style={{ fontSize: '2rem' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.5rem' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.25rem' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ fontSize: '1rem' }}>{children}</h4>,
    h5: ({ children }) => <h5 style={{ fontSize: '0.875rem' }}>{children}</h5>,
    h6: ({ children }) => <h6 style={{ fontSize: '0.875rem' }}>{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '2px solid gray', paddingLeft: '1rem' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className='mt-xl'>{children}</ul>,
    number: ({ children }) => <ol className='mt-lg'>{children}</ol>,
  },
};

const checkBodyFormat = (body) => {
  const objectContents = ['_key', '_type', 'children', 'markDefs', 'style'];

  if (Array.isArray(body)) {
    return body.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        objectContents.every((key) => key in item),
    );
  }
  return false;
};

const createBlockContent = (undividedString) => {
  const contentArray = undividedString.split('. ');
  return contentArray.map((text, index) => ({
    _key: `block-${index + 1}`,
    _type: 'block',
    children: [
      {
        _key: `child-${index + 1}`,
        _type: 'span',
        marks: [],
        text:
          index === contentArray.length - 1 ? text.trim() : `${text.trim()}.`,
      },
    ],
    markDefs: [],
    style: 'normal',
  }));
};

export default function TextContent({ text }) {
  if (text && !checkBodyFormat(text)) {
    text = createBlockContent(text);
  }
  return <PortableText value={text} components={customComponents} />;
}
