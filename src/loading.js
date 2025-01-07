import Image from "next/image"
export default function Loading() {
    return (
        <div className="container loading">
            <Image
                width={100}
                height={100}
                src="/assets/loading.svg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='Share'
                style={{ objectFit: 'contain' }}

            />
        </div>

    )

}