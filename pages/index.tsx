const Index = () => {

  const handleClickButton = async () => {
    await fetch("/api/scrapper");
  }

  return (
    <div className={"w-full min-h-[100vh] bg-gray-200 p-[15px]"}>
      <div className={"w-full h-full flex items-center justify-center"}>
        <button
          type="button"
          className="rounded-full border-4 border- bg-[#1d303d] px-12 py-4 font-medium text-white hover:border-[#1d303d]/10 hover:bg-[#1d303d]/90"
          onClick={handleClickButton}
        >
          CLICK HERE TO TEST!
        </button>
      </div>
    </div>
  )
}

export default Index;