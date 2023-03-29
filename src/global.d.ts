declare module "snappyjs" {
  /**
   * Compress input, which must be type of ArrayBuffer, Buffer, or Uint8Array. Compressed byte stream is returned, with same type of input.
   */
  const compress: (input: Uint8Array) => Uint8Array;

  /**
   * Uncompress compressed, which must be type of ArrayBuffer, Buffer, or Uint8Array. Uncompressed byte stream is returned, with same type of compressed.
   * If maxLength is provided, uncompress function will throw an exception if the data length encoded in the header exceeds maxLength. This is a protection mechanism for malicious data stream.
   */
  const uncompress: (input: Uint8Array, maxLength?: number) => Uint8Array;

  const snappy = {
    compress,
    uncompress,
  };

  export default snappy;
}
