import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Datepicker from 'tailwind-datepicker-react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useState } from 'react'

const Contact = () => {
    const options = {
        title: 'Date of Birth',
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date('2030-01-01'),
        minDate: new Date('1950-01-01'),
        theme: {
            background: 'bg-gray-300',
            todayBtn: '',
            clearBtn: '',
            icons: '',
            text: '',
            disabledText: 'bg-gray-200',
            input: '',
            inputIcon: '',
            selected: '',
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: 'top-12',
        defaultDate: new Date('2022-01-01'),
        language: 'en',
    }
    const [show, setShow] = useState(false)
    const handleChange = selectedDate => {
        console.log(selectedDate)
    }
    const handleClose = state => {
        setShow(state)
    }

    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = async event => {
        event.preventDefault()

        login({
            name,
            setErrors,
            setStatus,
        })
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Contact
                </h2>
            }>
            <Head>
                <title>Laravel - Contact</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Contact sales
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Aute magna irure deserunt veniam aliqua magna
                                enim voluptate.
                            </p>
                        </div>
                        <form
                            action="#"
                            method="POST"
                            className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="name">Name</Label>
                                    <div className="mt-2.5">
                                        <Input
                                            id="name"
                                            type="name"
                                            value={name}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setName(event.target.value)
                                            }
                                            required
                                            autoFocus
                                        />

                                        <InputError
                                            messages={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {/* <div className="sm:col-span-2">
                                    <label
                                        htmlFor="dob"
                                        className="block text-sm font-semibold leading-6 text-gray-900">
                                        Date of birth
                                    </label>
                                    <div className="relative max-w-sm mt-2.5">
                                        <Datepicker
                                            options={options}
                                            onChange={handleChange}
                                            show={show}
                                            setShow={handleClose}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="phone-number"
                                        className="block text-sm font-semibold leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                    <div className="relative mt-2.5">
                                        <div className="absolute inset-y-0 left-0 flex items-center">
                                            <label
                                                htmlFor="country"
                                                className="sr-only">
                                                Country
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                                <option>US</option>
                                                <option>CA</option>
                                                <option>EU</option>
                                            </select>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone-number"
                                            id="phone-number"
                                            autoComplete="tel"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Let's talk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Contact
