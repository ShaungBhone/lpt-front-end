import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Datepicker from 'tailwind-datepicker-react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import AuthSessionStatus from '@/components/AuthSessionStatus'

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
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: 'top-12',
        language: 'en',
    }
    const [show, setShow] = useState(false)
    const [dob, setDob] = useState(null)

    const handleChange = date => {
        setDob(date)
    }
    const handleClose = state => {
        setShow(state)
    }

    const [showInputDob, setShowInputDob] = useState(true)
    const [showInputPhone, setShowInputPhone] = useState(true)
    const [showInputGender, setShowInputGender] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [success, setSuccess] = useState(false)

    const { send } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/contact',
    })

    const router = useRouter()
    const submitForm = async event => {
        event.preventDefault()

        send({
            name,
            dob,
            phone,
            gender,
            setErrors,
            setStatus,
            onSuccess: () => setSuccess(true),
        })

        setName('')
        setDob(null)
        setPhone('')
    }

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })
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
                        <AuthSessionStatus className="mb-4" status={status} />
                        {console.log(success)}
                        {success && (
                            <div
                                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                                role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline">
                                    Your form has been submitted successfully.
                                </span>
                            </div>
                        )}
                        <form
                            onSubmit={submitForm}
                            className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="showInputName">
                                        <span className="ml-4">Name</span>
                                    </Label>
                                    <div>
                                        <Input
                                            id="name"
                                            type="name"
                                            value={name}
                                            className="block mt-4 w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                                <div className="sm:col-span-2">
                                    <Label htmlFor="showInputDob">
                                        <Input
                                            id="showInputDob"
                                            type="checkbox"
                                            checked={showInputDob}
                                            onChange={event =>
                                                setShowInputDob(
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                        <span className="ml-4">
                                            Date of birth
                                        </span>
                                    </Label>
                                    <div
                                        className={
                                            showInputDob
                                                ? 'relative max-w-sm mt-4'
                                                : 'hidden'
                                        }>
                                        <Datepicker
                                            selected={dob}
                                            options={options}
                                            onChange={handleChange}
                                            show={show}
                                            setShow={handleClose}
                                        />
                                        <InputError
                                            messages={errors.dob}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="showInputPhone">
                                        <Input
                                            id="showInputPhone"
                                            type="checkbox"
                                            checked={showInputPhone}
                                            onChange={event =>
                                                setShowInputPhone(
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                        <span className="ml-4">
                                            Phone Number
                                        </span>
                                    </Label>
                                    <div
                                        className={
                                            showInputPhone
                                                ? 'relative  mt-4'
                                                : 'hidden'
                                        }>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={phone}
                                            autoComplete="tel"
                                            onChange={event =>
                                                setPhone(event.target.value)
                                            }
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                        <InputError
                                            messages={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <Input
                                    id="showInputGender"
                                    type="checkbox"
                                    checked={showInputGender}
                                    onChange={event =>
                                        setShowInputGender(event.target.checked)
                                    }
                                />
                                <div
                                    className={showInputGender ? '' : 'hidden'}>
                                    <Input
                                        id="bordered-checkbox-1"
                                        type="checkbox"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={event =>
                                            setGender(event.target.value)
                                        }
                                        name="bordered-checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <Label
                                        htmlFor="bordered-checkbox-1"
                                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Male
                                    </Label>

                                    <Input
                                        id="bordered-checkbox-1"
                                        type="checkbox"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={event =>
                                            setGender(event.target.value)
                                        }
                                        name="bordered-checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <Label
                                        htmlFor="bordered-checkbox-1"
                                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Female
                                    </Label>
                                </div>
                            </div>
                            <div className="mt-10">
                                <Button className="ml-3">Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Contact
