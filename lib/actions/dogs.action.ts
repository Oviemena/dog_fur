export const getAllBreeds = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all")
    if (!res.ok) console.log("failed to fetch dog breeds data")
    const data = await res.json()
    const breedNames = Object.keys(data.message)
    const top50Breeds = breedNames.slice(0, 50)

    return {
        props: {
            breeds: top50Breeds.map(breed => ({ breed, subBreeds: data.message[breed] })),
        },
    }
}

export const getDogImageUrl = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/50")
    if (!res.ok) console.log("failed to fetch dog breeds data")
    const data = await res.json()
    const images = data.message

    return {
        props: {
            images: images.map((image: string) => ({ image })),
        },
    }
}

