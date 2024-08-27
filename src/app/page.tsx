import styles from "./page.module.css";
import Heading from "../components/heading";
import Layout from "@/components/layout";
import ConceptPreview from "@/components/conceptPreview";

export default function Home() {
    return (
        <Layout>
            <Heading />
            <main className={styles.main}>
                <ConceptPreview fdkUrl="https://staging.fellesdatakatalog.digdir.no/concepts/50dfe540-41b1-352f-869e-292c03999fc7" lang="nb">
                    <p>Testbegrep med definisjon på bokmål og nynorsk</p>
                </ConceptPreview>
            </main>
        </Layout>
    );
}
