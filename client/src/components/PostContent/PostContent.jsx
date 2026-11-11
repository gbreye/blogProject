import Title from '../Title/Title';
import './PostContent.css';

function PostContent({ title, subtitle, structure = [] }) {
  return (
    <section className="post-content">
      <Title as="h1" className="post-content__title">{title}</Title>
      <Title as="h2" subtitle className="post-content__subtitle">{subtitle}</Title>
      <div className="content-block">
        {structure.map((el) => {
          if (el.type === 'image') {
            return (
              <img
                key={el.id}
                src={el.src}
                alt={el.name || 'Imagem do post'}
                className="image-block"
              />
            );
          }

          if (el.type === 'text') {
            return (
              <p key={el.id} className="text-block">
                {el.content}
              </p>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}

export default PostContent;
