import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FC, memo } from 'react'
import { FilterType } from '../../redux/usersReducer'
import { useSelector } from 'react-redux'
import { getUsersFilters } from '../../redux/usersSelectors'

const usersSearchFormValidate = (values) => {
  const errors = {}
  return errors
}

type UsersSearchFormProps = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: 'null' | 'true' | 'false'
}

export const UsersSearchForm: FC<UsersSearchFormProps> = memo(({ onFilterChanged }) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
    }

    onFilterChanged(filter)
    setSubmitting(false)
  }

  const filter = useSelector(getUsersFilters)

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: filter.friend }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='term' />
            <Field as='select' name='friend'>
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <ErrorMessage name='term' component='div' />
            <button type='submit' disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
})
