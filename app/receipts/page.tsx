import PDFDropzone from "@/components/PDFDropzone";
import ReceiptList from "@/components/ReceiptList";
// import ReceiptList from "@/components/ReceiptList"

function Receipts() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10">
            <PDFDropzone /> 
            
            <ReceiptList />
        </div>
    </div>
  )
}

export default Receipts;