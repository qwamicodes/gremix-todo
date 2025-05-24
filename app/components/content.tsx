import parse from "html-react-parser";

interface Props {
	content: string;
}

function Content({ content }: Props) {
	if (!content) return null;

	return <article className="comment-article">{parse(content)}</article>;
}

export { Content };
