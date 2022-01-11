function NavToTop() {
  return (
    <button className="navToTop">
      <i
        className="fas fa-arrow-up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></i>
    </button>
  );
}

export default NavToTop;
