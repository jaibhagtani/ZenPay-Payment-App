


export default function InputOTPSlot({onChangeFunc} : any) {


    return <div className="">
        <input type="tel" className="bg-slate-200 w-10 h-10 border-slate-500 border-lg mx-2 rounded-lg text-center" maxLength={1} onChange={(e) => {
            onChangeFunc(e.target.value);
        }}></input>
    </div>
} 