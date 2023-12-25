import React from 'react';

interface TableDataProps {
  columns: string[];
  data: { [key: string]: string | number | React.ReactNode }[];
}

const TabelData: React.FC<TableDataProps> = ({ columns, data }) => {
  return (
    <>
      <div className="flex flex-col rounded-md border">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className={`px-4 py-5 bg-gray-300 ${
                          index === 0 ? 'text-center' : ''
                        } text-sm leading-4 font-medium tracking-wider`}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}
                      >
                        {Object.entries(item).map(([key, value], colIndex) => (
                          <td
                            key={colIndex}
                            className={`px-4 py-4 whitespace-no-wrap ${
                              colIndex === 0 ? 'text-center' : ''
                            }`}
                          >
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {key === 'col5' || key === 'col6' || key === 'col7' && React.isValidElement(value) ? (
                                value
                              ) : (
                                String(value)
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between my-3 pt-10">
        <p className="text-xs">Showing 1 to 10 of 1 entries</p>
        <div>
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-gray-300 border rounded-s-lg">
                Previous
              </a>
            </li>
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-300 ">1</a>
            </li>
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-300 rounded-e-lg">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TabelData;
