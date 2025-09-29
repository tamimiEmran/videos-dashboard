import PropTypes from 'prop-types';
import './TagCategory.css';

const TagCategory = ({ category, selectedTags, onToggleTag }) => {
  return (
    <section className="tag-category">
      <header className="tag-category__header">
        <h3>{category.name}</h3>
      </header>
      <div className="tag-category__tags">
        {category.tags.map((tag) => {
          const isActive = selectedTags.includes(tag.id);
          const isReadOnly = Boolean(category.readOnly);
          return (
            <button
              key={tag.id}
              type="button"
              className={`tag-chip${isActive ? ' tag-chip--active' : ''}${
                isReadOnly ? ' tag-chip--readonly' : ''
              }`}
              onClick={() => {
                if (!isReadOnly) {
                  onToggleTag(category.id, tag.id);
                }
              }}
              disabled={isReadOnly}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

TagCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleTag: PropTypes.func.isRequired
};

export default TagCategory;
