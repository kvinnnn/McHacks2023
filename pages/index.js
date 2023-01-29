import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import TagsInput from './components/TagsInput'

export default function Home() {
  const [tags, setTags] = useState([])
  const [result, setResult] = useState();

  function TextDivider(result) {
    var name
    var instructions
    var steps = []
    var time
    var info
    if (result === null) {
      return ['', '', 0]
    }
    const text = result?.split("Instructions:\n")
    name = text?.[0]
    instructions = text[1]?.split("Estimated Cooking Time:")
    const temp = instructions?.[0]?.split('\n')
    for (var i=1; i < temp.length/2; i = i + 2) {
      steps.push(temp[i])
    }
    time = instructions?.[1]
    info = [name, steps, time]
    return info;
  }

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
  // const [name, instructions] = input.split("Instructions:")
  // console.log(name)
  // console.log(instructions)

  return (
    <div>
      <Head>
        <title>RecipeZ</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.divider}>
          <div style={{flex: 0}}>
            <img src="/logo.png" className={styles.icon} />
            <h3>Create my recipe</h3>
            <TagsInput
                tags={tags}
                setTags={setTags}
              />
            <form onSubmit={onSubmit}>
              <input type="Submit" value="Generate recipes" />
            </form>
            {/* <div className={styles.result}>{result}</div> */}
          </div>
          {result && <div style={{flex: 2}}>
            <div className={styles.name}>{TextDivider(result)[0]}</div>
            <div className={styles.other_box}>
              <div className={styles.ingredients_list}>
                Ingredients:
                <ul>
                  {[...tags, 'salt', 'pepper', 'vegetable oil'].map(tag => <li>{tag}</li>)}
                </ul>
                Time: {TextDivider(result)[2]}
              </div>
              <div className={styles.instructions}>Instructions: {TextDivider(result)[1].map(instruction => <div>{instruction}</div>)}</div>
            </div>
            

          </div>}
        </div>
      </main>
    </div>
  );
}
