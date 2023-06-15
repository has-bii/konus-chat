export default function Validation({ alert }) {
  return (
    <div className="mt-2 mb-1 font-medium text-red-600">{alert.message}</div>
  );
}
