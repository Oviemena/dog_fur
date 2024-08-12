import { DOGS } from '../app/constants';
import { db } from '../app/db/index';
import { dogs } from '../app/db/schema';
import { getAllBreeds, getDogImageUrl } from '@/lib/actions/dogs.action';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
    try {
        const breedsResponse = await getAllBreeds();
        const imagesResponse = await getDogImageUrl();

        // Extracting breed names and images from the responses
        const breedNames = breedsResponse.props.breeds.map(b => b.breed);
        const images = imagesResponse.props.images;

        // Combine DOGS with breed names and images
        const combinedDogs = DOGS.map((dog, index) => ({
            ...dog,
            breed: breedNames[index] || 'Unknown Breed',
            imageUrl: images[index] || 'No Image Available',
        }));

        // Insert into the database
        for (const dog of combinedDogs) {
            await db.insert(dogs).values(dog);
        }

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding database', error);
    }
}
console.log('Ending seed script');

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});

