'use client'
import { Page, Form } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'

type ContactProps = Extract<Page['layout'][0], { blockType: 'contact-form' }>

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

type InputFormField = Extract<
  NonNullable<Form['fields']>[number],
  {
    blockType:
      | 'text'
      | 'email'
      | 'textarea'
      | 'number'
      | 'checkbox'
      | 'select'
      | 'country'
      | 'state'
    name: string
    label?: string | null
    required?: boolean | null
  }
>

export default function ContactBlock({ block }: { block: ContactProps }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!block.form || typeof block.form !== 'object') return

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      // Reset the form
      ;(e.target as HTMLFormElement).reset()

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          error: null,
          success: false,
        })
      }, 5000)
    } catch (error) {
      console.error(error)
      setFormState({
        loading: false,
        error: 'Failed to submit form',
        success: false,
      })
    }
  }
  return (
    <>
      {typeof block?.form === 'object' && block?.form?.title === 'Contact' && (
        <section id="contact" className="contactSection">
          {block.heading && <RichText data={block.heading} />}
          <form className="form" onSubmit={handleSubmit}>
            {block.form.fields?.map((field) => {
              // Only render input fields
              const inputField = field as InputFormField
              if (!('name' in field)) return null

              return (
                <div key={inputField.name}>
                  {/* <label htmlFor={inputField.name}>{inputField.label}</label> */}
                  {inputField.blockType === 'textarea' ? (
                    <textarea
                      name={inputField.name}
                      required={inputField.required || false}
                      placeholder={inputField.label || ''}
                      rows={5} // Optional: define default height
                    />
                  ) : (
                    <input
                      type={inputField.blockType}
                      name={inputField.name}
                      required={inputField.required || false}
                      placeholder={inputField.label || ''}
                    />
                  )}
                </div>
              )
            })}

            {/* display error or success message */}
            {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}

            {formState.success ? (
              <div className="confirmationMessage">
                <RichText data={block.form.confirmationMessage!} />
              </div>
            ) : (
              <div className="sendButtonContainer">
                <button type="submit">{block.form.submitButtonLabel || 'Submit'}</button>
                {formState.loading && <span className="loader"></span>}
              </div>
            )}
          </form>
        </section>
      )}
    </>
  )
}
