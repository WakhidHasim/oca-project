import React from "react"



const TabelData: React.FC = () => {
  return (
    <div className='bg-slate-100 w-full mx-auto p-5 rounded'>
        <div className="pt-3 justify-between">
            <button className="bg-purple text-white p-2 px-5 rounded text-sm">Kembali</button>
            <div>
            
                

            </div>
        </div>

         <div className="flex flex-col my-5 bg-gray-25 rounded-md border">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 text-left">
                            <thead>
                                <tr>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        No
                                    </th>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Tanggal Kegiatan
                                    </th>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Uraian Kegiatan
                                    </th>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        No Pengajuan
                                    </th>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Total Pajak
                                    </th>
                                    <th
                                        className="px-4 py-5 bg-custom-purple text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Status
                                    </th>
                                
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-4 whitespace-no-wrap text-center">
                                        <p className="text-sm leading-5 font-medium text-gray-900">aa</p>
                                    </td>
                                    <td className="px-4 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 font-medium text-gray-900">aa</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 font-medium text-gray-900">aa</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-no-wrap  ">
                                        <div className="text-sm leading-5 font-medium text-gray-900">aa
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-no-wrap  ">
                                        <div className="text-sm leading-5 font-medium text-gray-900">aa</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-no-wrap  ">
                                        <div className="text-sm leading-5 font-medium text-gray-900">aa</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>   
    </div>

    );
};

export default TabelData;