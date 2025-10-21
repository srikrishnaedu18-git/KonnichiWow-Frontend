export default function ProgressBar({current,total}){
    const percent = (current/total) * 100 ;
    return (
        <div className= "border-1 border-grey rounded-full w-120 h-4 -mt-2 mb-4 ml-5">
            <div className= "h-full bg-green-500 rounded-full transition-all duration-500" style={{width : `${percent}%`}}></div>
        </div>
    );
}