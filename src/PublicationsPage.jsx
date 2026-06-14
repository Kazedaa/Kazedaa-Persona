import { publications } from "./data/portfolioData";
import P5CardGridPage from "./P5CardGridPage";

export default function PublicationsPage() {
  return (
    <P5CardGridPage 
      title="PUBLICATIONS"
      items={publications}
      cardLinkText="READ >"
      modalLinkText="READ PAPER >"
    />
  );
}
