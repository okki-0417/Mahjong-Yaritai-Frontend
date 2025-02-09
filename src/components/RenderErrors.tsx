export type Errors = {
  message: string;
}[];

export default function RenderErrors({ errors }: { errors: Errors }) {
  return (
    <div className="bg-red-200 p-2 rounded-sm text-red-500 text-red">
      <p className="text-lg font-bold">ERROR!!</p>
      <ul className="list-disc pl-4">
        {errors[0] &&
          errors.map((error, index) => (
            <li key={index} className="text-red-500">
              {error.message}
            </li>
          ))}
      </ul>
    </div>
  );
}
