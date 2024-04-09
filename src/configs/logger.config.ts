export const customLoggerLevel = (req, res, error) => {
  if (res.statusCode >= 400 && res.statusCode < 500) {
    return 'warn'
  } else if (res.statusCode >= 500 || error) {
    return 'error'
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    return 'silent'
  }
  return 'info'
}

export const customSuccessMessage = (req, res) => {
  return `${req.method} SUCCESS`
}

export const customSuccessObject = (req, res, val) => {
  return {
    ...val,
    category: 'ApplicationEvent',
    eventCode:
      res.statusCode < 300 ? 'REQUEST_PROCESSED' : 'REQUEST_FAILED',
  }
}

export const customReceivedMessage = (req, res) => {
  return 'Method: ' + req.method
}

export const customReceivedObject = (req, res, val) => {
  return {
    category: 'ApplicationEvent',
    eventCode: 'REQUEST_RECEIVED',
  }
}

export const customErrorMessage = (req, res, error) => {
  return 'Status Code: ' + res.statusCode
}
