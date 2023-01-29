import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import TagsInput from './components/TagsInput'

export default function Home() {
  const [tags, setTags] = useState([])
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      var ingredients = ''
      for (var i=0; i < tags.length; i++) {
        ingredients += tags[i] + ', '
      }
      console.log('ingredients', ingredients)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: ingredients }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // setTags([]);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.icon} />
        <h3>Create my recipe</h3>
        <TagsInput
            tags={tags}
            setTags={setTags}
          />
        <form onSubmit={onSubmit}>
          <input type="submit" value="Generate recipes" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
