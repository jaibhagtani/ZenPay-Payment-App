
interface LabelledInputProps {
    label : string;
    placeholder : string;
    onChangeFunc : (value : string) => void;
}


export default function LabelledInputAuth({label, placeholder, onChangeFunc} : LabelledInputProps)
{
    return (
        <div>
            <div className="mb-2 text-sm font-bold text-gray-900">
                {label}
            </div>
            <input onChange={(e) => {
                onChangeFunc(e.target.value);
            }} placeholder={placeholder} className="py-5 border border-gray-300 h-9 rounded-lg w-full bg-gray-50 p-2.5 text-gray-900 text-md focus:ring-blue-500"></input>
        </div>
    )
}