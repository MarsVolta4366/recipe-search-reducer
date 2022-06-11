import { Alert, Button, FormControl, Input, InputLabel } from "@mui/material"
import emailjs from "@emailjs/browser"
import styles from "./contact.module.scss"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Result = () => {
    return (
        <Alert severity="success">Your message has been sent, we'll get back to you as soon as possible.</Alert>
    )
}

const Contact = () => {

    const { theme } = useContext(ThemeContext)
    const [result, showResult] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs.sendForm('service_dq64wyi', 'template_zl69gy6', e.target, 'user_Knvt3cfypK9FqZMBLgV6s')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            })
        e.target.reset()
        showResult(true)

        setTimeout(() => {
            showResult(false)
        }, 15000)
    }

    return (
        <div className={`center ${styles.contact} ${styles[theme]}`}>
            <h1 className="text">Contact</h1>
            <form action="" onSubmit={sendEmail}>
                <div className={styles.flexColumn}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="fullName" className={`${styles.inputLabel} ${styles[theme]}`}>
                            Full Name
                        </InputLabel>
                        <Input id="fullName" name="fullName" className="text" required inputProps={{ maxLength: 40 }} />
                    </FormControl>

                    <FormControl variant="standard" style={{ marginTop: "10px" }}>
                        <InputLabel htmlFor="email" className={`${styles.inputLabel} ${styles[theme]}`}>
                            Email
                        </InputLabel>
                        <Input id="email" name="email" type="email" className="text" required inputProps={{ maxLength: 40 }} />
                    </FormControl>

                    <label htmlFor="message"><h3 className="text">Message</h3></label>
                    <textarea id="message" name="message" className={`${styles.textArea} ${styles[theme]}`} placeholder="Enter your message" required maxLength="1000" />

                    <Button type="submit" className="text" style={{ marginTop: "10px", marginBottom: "10px" }}>Submit</Button>

                    {result && <Result />}
                </div>
            </form>
        </div>
    )
}

export default Contact