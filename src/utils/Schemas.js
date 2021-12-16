import PropTypes from "prop-types";

const PostSchema = (props) => {
  return {
    id: props.id,
    content: props.content,
    upvotes: props.upvotes,
    downvotes: props.downvotes,
    datePosted: new Date(),
    dateModified: new Date(),
    authorId: props.authorId,
    parent: props.parent,
    children: props.children,
  };
};

const ThreadSchema = (props) => {
  return {
    id: props.id,
    title: props.title,
    first_post: props.first_post,
    tags: props.tags,
    category: props.category,
    answered: props.answered,
  };
};

ThreadSchema.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  post: PostSchema.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  answered: PropTypes.bool,
};

ThreadSchema.defaultProps = { answered: false };

PostSchema.prototype = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  datePosted: new Date(),
  dateModified: new Date(),
  authorId: PropTypes.string.isRequired,
  parent: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PostSchema.defaultProps = {
  upvotes: 0,
  downvotes: 0,
};

export { PostSchema, ThreadSchema };
