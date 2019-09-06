var test_base

if (process.env.NODE_ENV === 'production') {
  //  product
  test_base = process.env.BASE_API
} else {
  //  development
  test_base = '127.0.0.1:8010/api'
}

export const test_base_ = test_base

