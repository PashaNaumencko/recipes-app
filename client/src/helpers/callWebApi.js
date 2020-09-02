import * as queryString from 'query-string';

function getFetchUrl(args) {
  return args.endpoint + (args.query ? `?${queryString.stringify(args.query)}` : '');
}

function getFetchArgs(args) {
  const headers = {};
  if (!args.attachment) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }

    body = fillFormData(args.request);
  } else if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.request);
  }
  return {
    method: args.type,
    headers,
    signal: args.ct,
    ...(args.request === 'GET' ? {} : { body })
  };
}

function fillFormData(request) {
  const formData = new FormData();
  Object.keys(request).forEach((field) => {
    if(field === 'imgFile') {
      formData.append('imgFile', request[field] ? request[field][0] : null);
    } else {
      formData.append(field, Array.isArray(request[field])
        ? JSON.stringify(request[field])
        : request[field]
      );
    }
  });

  return formData;
}

export async function throwIfResponseFailed(res) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      //
    }
    throw parsedException;
  }
}

export default async function callWebApi(args) {
  try {
    const res = await fetch(
      getFetchUrl(args),
      getFetchArgs(args)
    );
    await throwIfResponseFailed(res);
    return res;
  } catch (err) {
    throw err;
  }
}
