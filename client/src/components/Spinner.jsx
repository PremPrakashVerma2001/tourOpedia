import loadImg from "../img/loading.gif";

function Spinner() {
  return (
    <div className=" {border-4 border-red-700} h-[90vh] w-full flex items-center justify-center ">
      <img src={loadImg} className=" w-[100px] h-[100px] rounded-full " />
      {/* <h1>Loading....</h1> */}
    </div>
  );
}

export default Spinner;
