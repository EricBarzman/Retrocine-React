import { createClient } from "@sanity/client";

const sanityClient = createClient({
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_APP_SANITY_DATASET,
    useCdn: true,
    apiVersion: '2023-05-03',
});

export default sanityClient;