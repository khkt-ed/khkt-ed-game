import "./Bubble.css"

const Bubble = props => {
  return (
    <blockquote className="bubble" style={{ fontSize: (1.2 * props.scale).toString() + "rem" }}>
      <span>{props.children}</span>
    </blockquote>
  );
};

export default Bubble;