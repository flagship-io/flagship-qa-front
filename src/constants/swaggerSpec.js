const hitBodyParams = {
  t: { type: 'string', required: true },
  ea: { type: 'string', required: true },
  ev: { type: 'integer', required: true },
  tid: { type: 'string', required: true },
  ta: { type: 'string', required: true },
  tr: { type: 'float', required: true },
  ic: { type: 'string', required: false },
  in: { type: 'string', required: false },
  iq: { type: 'integer', required: false },
  dl: { type: 'string', required: false }
}

export default {
  swagger: '2.0',
  info: {
    description: 'This is a the spec for the QA app API',
    title: 'QA App API'
  },
  basePath: '/',
  tags: [
    {
      name: 'Environment',
      description: 'Environment routes'
    },
    {
      name: 'Visitor',
      description: 'Visitor routes'
    },
    {
      name: 'Flag',
      description: 'Flag routes'
    }
  ],
  paths: {
    '/env': {
      get: {
        tags: ['Environment'],
        summary: 'Get current environment setting',
        operationId: 'getEnv',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/EnvInfo' }
            }
          }
        }
      },
      put: {
        tags: ['Environment'],
        summary: 'Set the environment',
        operationId: 'setEnv',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'environment_id',
            in: 'body',
            description: 'The environment_id',
            required: true,
            type: 'string'
          },
          {
            name: 'api_key',
            in: 'body',
            description: 'The API Key',
            required: true,
            type: 'string'
          },
          {
            name: 'timeout',
            in: 'body',
            description: 'The API calls timeout in seconds',
            required: true,
            type: 'integer'
          },
          {
            name: 'bucketing',
            in: 'body',
            description: 'Use bucketing mode',
            required: true,
            type: 'boolean'
          },
          {
            name: 'polling_interval',
            in: 'body',
            description: 'The Bucketing polling interval in milliseconds',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/EnvInfo' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/visitor': {
      get: {
        tags: ['Visitor'],
        summary: 'Get current visitor setting',
        operationId: 'getVisitor',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/VisitorInfo' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      },
      put: {
        tags: ['Visitor'],
        summary: 'Set the visitor',
        operationId: 'setVisitor',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'visitor_id',
            in: 'body',
            description: 'The visitor ID',
            required: true,
            type: 'string'
          },
          {
            name: 'context',
            in: 'body',
            description: 'The visitor context',
            required: true,
            type: 'object'
          },
          {
            name: 'consent',
            in: 'body',
            description: 'The visitor consent',
            required: true,
            type: 'boolean'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/VisitorInfo' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/visitor/context/{name}': {
      put: {
        tags: ['Visitor'],
        summary: 'Add specific context to the visitor',
        operationId: 'updateContext',
        produces: ['application/json'],
        consumes: ['application/json'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The context key name',
            required: true,
            type: 'string'
          },
          {
            name: 'type',
            in: 'body',
            description: 'The context type',
            required: true,
            type: 'string'
          },
          {
            name: 'value',
            in: 'body',
            description: 'The context value',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/ContextInfo'
            }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/visitor/context/{key}': {
      put: {
        tags: ['Visitor'],
        summary: 'Update context key',
        operationId: 'setVisitorContextKey',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'type',
            in: 'body',
            description: 'The key type',
            required: true,
            type: 'string'
          },
          {
            name: 'value',
            in: 'body',
            description: 'The new context key value',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/VisitorInfo' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/authenticate': {
      put: {
        tags: ['Visitor'],
        summary: 'Authenticate current visitor',
        operationId: 'authenticateVisitor',
        produces: ['application/json'],
        parameters: [
          {
            name: 'new_visitor_id',
            in: 'body',
            description: 'The new visitor ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/VisitorAuthenticated' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/unauthenticate': {
      put: {
        tags: ['Visitor'],
        summary: 'Unauthenticate current visitor',
        operationId: 'unauthenticateVisitor',
        produces: ['application/json'],
        parameters: [],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/VisitorAuthenticated' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/flag/{name}': {
      get: {
        tags: ['Flag'],
        summary: 'Get specific flag value',
        operationId: 'getFlagValue',
        produces: ['application/json'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The flag key name',
            required: true,
            type: 'string'
          },
          {
            name: 'type',
            in: 'query',
            description:
              'The flag type (string, number, bool, array or object)',
            required: true,
            enum: ['string', 'number', 'bool', 'array', 'object'],
            type: 'string'
          },
          {
            name: 'activate',
            in: 'query',
            description: 'Should the flag be activated',
            required: true,
            type: 'boolean'
          },
          {
            name: 'defaultValue',
            in: 'query',
            description: 'The flag default value',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              items: { $ref: '#/definitions/FlagValueInfo' }
            }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/flag/{name}/info': {
      get: {
        tags: ['Flag'],
        summary: 'Get specific flag information',
        operationId: 'getFlagInfo',
        produces: ['application/json'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The flag key name',
            required: true,
            type: 'string'
          },
          {
            name: 'defaultValue',
            in: 'query',
            description: 'The flag default value',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/FlagInfo'
            }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/flag/{name}/activate': {
      get: {
        tags: ['Flag'],
        summary: 'Activate a specific flag',
        operationId: 'activateFlag',
        produces: ['application/json'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The flag key name',
            required: true,
            type: 'string'
          },
          {
            name: 'defaultValue',
            in: 'query',
            description: 'The flag default value',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation'
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/hits': {
      post: {
        tags: ['Hits'],
        summary: 'Send hit to data collect',
        operationId: 'sendHit',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: Object.entries(hitBodyParams).map(
          ([k, { type, required }]) => ({
            name: k,
            in: 'body',
            required,
            type
          })
        ),
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/EnvInfo' }
          },
          400: {
            description: 'error operation',
            schema: { $ref: '#/definitions/BadRequest' }
          }
        }
      }
    },
    '/logs': {
      get: {
        tags: ['Logs'],
        summary: 'Get all logs from the SDK',
        operationId: 'getLogs',
        produces: ['text/plain'],
        responses: {
          200: {
            description: 'successful operation'
          }
        }
      }
    },
    '/logs/clear': {
      post: {
        tags: ['Logs'],
        summary: 'Clear all logs from the SDK',
        operationId: 'Logs',
        produces: ['text/plain'],
        responses: {
          200: {
            description: 'successful operation'
          }
        }
      }
    }
  },

  definitions: {
    EnvInfo: {
      type: 'object',
      properties: {
        environment_id: { type: 'string' },
        api_key: { type: 'string' },
        timeout: { type: 'integer' },
        bucketing: { type: 'boolean' },
        polling_interval: { type: 'integer' }
      }
    },
    VisitorInfo: {
      type: 'object',
      properties: {
        visitor_id: { type: 'string' },
        context: { type: 'object' },
        consent: { type: 'boolean' },
        modification: { type: 'object' }
      }
    },
    ContextInfo: {
      type: 'object',
      properties: {
        context: { type: 'string' },
        flags: { type: 'object' }
      }
    },
    VisitorAuthenticated: {
      type: 'object',
      properties: {
        visitorId: { type: 'string' },
        anonymousId: { type: 'string' }
      }
    },
    FlagValueInfo: {
      type: 'object',
      properties: {
        value: {
          oneOf: [
            { type: 'string' },
            { type: 'double' },
            { type: 'boolean' },
            { type: 'array' },
            { type: 'object' }
          ]
        },
        error: { type: 'string' }
      }
    },
    FlagInfo: {
      type: 'object',
      properties: {
        value: {
          oneOf: [
            { type: 'string' },
            { type: 'double' },
            { type: 'boolean' },
            { type: 'array' },
            { type: 'object' }
          ]
        },
        isReference: { type: 'boolean' },
        campaignId: { type: 'string' },
        variationGroupId: { type: 'string' },
        variationId: { type: 'string' }
      }
    },
    BadRequest: {
      type: 'object',
      properties: {
        ok: { type: 'boolean' },
        error: { type: 'string' }
      }
    }
  }
}
