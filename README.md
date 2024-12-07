run `bun run build` (or `npm run build`) multiple times. at some point it will stop when processing `BaseLayout.astro` withour any error.

It fails inside the function `bufferHeadContent`, because `await value.init(result)` never completes.

More info here: https://github.com/withastro/astro/issues/12674

```
async function bufferHeadContent(result) {
  const iterator = result._metadata.propagators.values();
  console.log("RESULT")
  console.log(result);
  let index = 0;
  while (true) {
    console.log(index)
    const { value, done } = iterator.next();
    console.log(value)
    if (done) {
      console.log("done " + index);
      break;
    }
   
    console.log("value.INIT")
    console.log(value.init);
    const returnValue = await value.init(result);
    console.log("init " + index)
    if (isHeadAndContent(returnValue)) {
      result._metadata.extraHead.push(returnValue.head);
    }
    index++;
  }
}
```
