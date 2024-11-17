// File Operations (assuming a browser-based file API)
const fileQuery = useQuery({
    queryKey: ['file', path],
    queryFn: () => readLocalFile(path),
    staleTime: Infinity // Cache file content indefinitely
});

// Browser APIs
const locationQuery = useQuery({
    queryKey: ['location'],
    queryFn: () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }),
    refetchOnWindowFocus: false
});

// Offline Support
const offlineQuery = useQuery({
    queryKey: ['offline-data'],
    queryFn: () => fetchDataFromIndexedDB(),
    staleTime: Infinity,
    cacheTime: Infinity
});