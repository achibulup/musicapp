type SongData = {
    title: string;
    artist: string | null;
    album: string | null;
    coverUrl: string | null;
    fileUrl: string;
}

type Song = SongData & {
    id: number;
}