import Configuration from "@/components/image-generation/configurations";

const ImageGeneration =() => {
    return (
        <section className="container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
            <Configuration />
            <div className="col-span-2 p-4 rounded-xl flex items-center justify-center">
                output image
            </div>
        </section>
    )
}
export default ImageGeneration;