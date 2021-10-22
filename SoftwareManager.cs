using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace es_challenge
{
    public class SoftwareProfile {
        public DateTime Date { get; set; }

        public string Summary { get; set; }

        public string Name { get; set; }

        public string Version { get; set; }
    }

    public static class SoftwareManager {

        public static bool IsGreaterThan(this string inVersion, string compareToVer) {
            try {
                // convert given SW version and compareTo version to numeric arrays
                var aNums = getVersionParts(inVersion);
                var bNums = getVersionParts(compareToVer);

                // find which version collection has the largest possible count
                int length = Math.Max(aNums.Length, bNums.Length);

                // iterate over largest number of total possible segments and compare a vs. b
                // this will compare in order of [major] [minor] [patch]
                // if any of the evals in that order are greater, then base version, then target SW version is greater
                for (int i = 0; i < length; i++) {
                    // if part exists for respective collection, then assign number, else default to 0
                    int a = i < aNums.Length ? aNums[i] : 0;
                    int b = i < bNums.Length ? bNums[i] : 0;
                    // see if matched version parts are explicitly GT or LT
                    if (a > b) return true;
                    if (a < b) return false;
                    // if all things equal we fall out of loop, default is false
                }

            } catch (Exception ex) {
                Debug.WriteLine($"Exception comparing {inVersion} against {compareToVer}: {ex.Message}");
            }

            return false;
        }

        public static int[] getVersionParts(string version) {
            return version.Split(".").Select(x => Convert.ToInt32(x)).ToArray();
        }

        public static bool IsValidVersionNumber(this string version) {
            // thanks you https://ihateregex.io/expr/semver/
            Regex rgx = new Regex("^(0|[1-9]\\d*)\\.?(0|[1-9]\\d*)?\\.?(0|[1-9]\\d*)?$");
            if (rgx.IsMatch(version)) {
                return getVersionParts(version).Length < 4 && !version.EndsWith(".");
            }
            return false;
        }

        public static IEnumerable<SoftwareProfile> GetAllSoftware() {
            return new List<SoftwareProfile> {
                new SoftwareProfile {
                    Name = "MS Word",
                    Version = "13.2.1"
                },
                new SoftwareProfile {
                    Name = "AngularJS",
                    Version = "1.7.1"
                },
                new SoftwareProfile {
                    Name = "Angular",
                    Version = "8.1.13"
                },
                new SoftwareProfile {
                    Name = "React",
                    Version = "0.0.5"
                },
                new SoftwareProfile {
                    Name = "Vue.js",
                    Version = "2.6"
                },
                new SoftwareProfile {
                    Name = "Visual Studio",
                    Version = "2017.0.1"
                },
                new SoftwareProfile {
                    Name = "Visual Studio",
                    Version = "2019.1"
                },
                new SoftwareProfile {
                    Name = "Visual Studio Code",
                    Version = "1.35"
                },
                new SoftwareProfile {
                    Name = "Blazor",
                    Version = "0.7"
                }
            };
        }
    }
}
