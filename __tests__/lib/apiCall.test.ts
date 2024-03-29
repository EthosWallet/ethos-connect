import apiCall from '../../src/lib/apiCall'

describe('apiCall', () => {
  let spyFetch: jest.SpyInstance
  const expectedHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const relativePath = 'test'
  const body = { example: true }
  const expectedResponseJson = { balance: '1' }
  const expectedStatus = 200
  const mockResponse = {
    json: async () => expectedResponseJson,
    status: expectedStatus,
  } as Response

  beforeEach(() => {
    global.fetch = jest.fn()
    spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse)
  })

  it('should call an API with all parameters', async () => {
    const method = 'GET'
    const expectedEndpointCalled = `test/api/${relativePath}`
    const expectedApiCallParameters = {
      method: method,
      headers: expectedHeaders,
      body: JSON.stringify(body),
    }

    const result = await apiCall({ relativePath, body, method })

    expect(spyFetch).toBeCalledTimes(1)
    expect(spyFetch).toBeCalledWith(expectedEndpointCalled, expectedApiCallParameters)
    expect(result.json).toEqual(expectedResponseJson)
    expect(result.status).toBe(expectedStatus)
  })

  it('should call an API with all REQUIRED parameters', async () => {
    const expectedEndpointCalled = 'test/api/' + relativePath
    const expectedApiCallParameters = {
      method: 'GET',
      headers: expectedHeaders,
      body: undefined,
    }

    const result = await apiCall({ relativePath })

    expect(spyFetch).toBeCalledTimes(1)
    expect(spyFetch).toBeCalledWith(expectedEndpointCalled, expectedApiCallParameters)
    expect(result.json).toEqual(expectedResponseJson)
    expect(result.status).toBe(expectedStatus)
  })
})
