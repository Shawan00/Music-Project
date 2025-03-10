import { useEffect, useState } from "react";
import { getGenre } from "../../../services/Admin/genreService";
import CreateGenre from "./CreateGenre";
import Pagination from "../../../components/Admin/Pagination";
import { useSearchParams } from "react-router-dom";
import GenreList from "./GenreList";

function Genre() {
	const [genreData, setGenreData] = useState({});
	const genreList = genreData.data;
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page")) || 1;
	const pageSize = parseInt(searchParams.get("pageSize")) || 8;

	console.log("render");
	useEffect(() => {
		document.title = "Manage genre | Music project";
		const getData = async () => {
			const res = await getGenre(page, pageSize, "createdAt", "desc");
			setGenreData(res.data);
		}
		getData();
	}, [page, pageSize]);

	return genreList ? (
		<>
			<CreateGenre />
			<Pagination objectPagination={genreData.objectPagination}/>
			<GenreList data={genreList} />
			<Pagination objectPagination={genreData.objectPagination}/>
		</>
	) : (
		<>Loading...</>
	);
}

export default Genre