function Button({ onclick, text }: any) {
  return (
    <button
      type="button"
      className="rounded-full border-4 border-orange bg-orange px-12 py-4 font-medium text-white shadow-md hover:border-orange/10 hover:bg-orange/90"
      onClick={onclick}
    >
      {text}
    </button>
  );
}

export default Button;
