function NavToTop() {
  return (
    <span className="navToTop">
      <i
        className="fas fa-arrow-up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></i>
    </span>
  );
}

export default NavToTop;
