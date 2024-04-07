function ServiceCard(props: { imgPath: string; alt: string; label: string }) {
  return (
    <div className="w-[16vw] h-[16vw] flex flex-col justify-center items-center gap-4 border-2 shadow-md hover:bg-zinc-100">
      <img className="w-8/12" src={props.imgPath} alt={props.alt} />
      <h2 className="text-center font-normal text-xl">{props.label}</h2>
    </div>
  );
}

export default ServiceCard;
