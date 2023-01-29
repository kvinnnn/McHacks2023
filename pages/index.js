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
    console.log('result', result);
    const newTemp = result?.split('Name:')
    console.log('newTemp', newTemp)

    const text = newTemp[0]?.split("Instructions:\n")
    name = text?.[0]
    instructions = text[1]?.split("Estimated Cooking Time:")
    const temp = instructions?.[0]?.split('\n')
    console.log('temp', temp);
    var i = 0;
    for (i; i < temp?.length; i++) {
      if (i === 1 || i === 0) {
        steps.push('\n' + temp?.[i])
      }
      else {
        steps.push(temp?.[i])
      }
    }
    time = instructions?.[1]

    var name2
    var instructions2
    var steps2 = []
    var time2
    var info2
    const text2 = newTemp[1]?.split("Instructions:\n")
    name2 = text2?.[0]
    instructions2 = text2[1]?.split("Estimated Cooking Time:")
    const temp2 = instructions2?.[0]?.split('\n')
    console.log('temp', temp2);
    var i2 = 0;
    for (i2; i2 < temp2?.length; i2++) {
      if (i2 === 1 || i2 === 0) {
        steps2.push('\n' + temp2?.[i2])
      }
      else {
        steps2.push(temp2?.[i2])
      }
    }
    time2 = instructions2?.[1]
    info = [name, steps, time, name2, steps2, time2]
    console.log('info', info)
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
    <div style={{marginLeft: '100px', marginRight: '100px'}}>
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
          {result && <div style={{flex: 2, marginLeft: '50px', overflowY: 'scroll'}}>
            <div className={styles.name}>{TextDivider(result)[0]}</div>
            <div className={styles.other_box}>
              <div className={styles.ingredients_list}>
                <span className={styles.bigBold}>Ingredients:</span>
                <ul>
                  {[...tags, 'Salt', 'Pepper', 'Vegetable oil'].map(tag => <li>{tag}</li>)}
                </ul>
                Time: {TextDivider(result)[2]}
              </div>
              <div className={styles.instructions}><span className={styles.bigBoldSpace}>Instructions:</span>
                {TextDivider(result)[1].map(instruction => <div>{instruction}</div>)}
              </div>
            </div>
            
            <hr
                style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 1
                }}
            />
            <div className={styles.name}>{TextDivider(result)[3]}</div>
            <div className={styles.other_box}>
              <div className={styles.ingredients_list}>
                <span className={styles.bigBold}>Ingredients:</span>
                <ul>
                  {[...tags, 'Salt', 'Pepper', 'Vegetable oil'].map(tag => <li>{tag}</li>)}
                </ul>
                Time: {TextDivider(result)[5]}
              </div>
              <div className={styles.instructions}><span className={styles.bigBoldSpace}>Instructions:</span>
                {TextDivider(result)[4].map(instruction => <div>{instruction}</div>)}
              </div>
            </div>
          </div>}
        </div>
      </main>
    </div>
  );
}
