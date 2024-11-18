import Image from "next/image"
export default function Loading() {
    return (
        <div className="container loading">
            <Image
                width={150}
                height={150}
                src="/assets/loading.svg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='Share'
                style={{ objectFit: 'contain' }}

            />
        </div>

    )

}