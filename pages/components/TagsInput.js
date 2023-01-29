import React, { useState } from "react";
import styles from './TagsInput.module.css';

const TagsInput = ({tags, setTags}) => {
    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }
    return (
        <div className={styles.tag_input_container}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input onKeyDown={handleKeyDown} type="text" className={styles.tags_input} placeholder="Type an ingredient"/>
                <img src="/camera3.png" className={styles.icon} />
            </div>
            <div>
            { tags.map((tag,index) => (
                <div className={styles.tag_item} key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            </div>
            
        </div>
    )
}

export default TagsInput