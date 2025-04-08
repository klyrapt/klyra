const Table = ({
  columns,
  renderRow,
  data = [], // valor padrão como array vazio
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data?: any[]; // <-- agora é opcional
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.length > 0 ? (
        data.map((item) => renderRow(item))
      ) : (
        <tr>
          <td colSpan={columns.length} className="text-center text-gray-400 py-4">
            Nenhum dado encontrado.
          </td>
        </tr>
      )}
</tbody>
    </table>
  );
};

export default Table;
