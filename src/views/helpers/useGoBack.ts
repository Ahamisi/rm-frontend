// goBackHelper.ts
export function goBack(router: any) {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
}
