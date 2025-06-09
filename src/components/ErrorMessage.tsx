export type ErrorMessageType = {
  message: string | undefined;
};

export default function ErrorMessage({ message }: ErrorMessageType) {
  if (!message) return null;

  return (
    <div className="bg-red-200 my-1 px-2 py-1 rounded-sm text-red-500 text-red max-w-fit">
      <p className="max-w-fit text-red-500" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
