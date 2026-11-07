# Module 9: Power Series, Radius & Interval of Convergence

# Module 9: Power Series
## Calculus 1 - Final Examination Preparation

### 1. General Form
A power series centered at $x = c$:
$$\sum_{n=0}^{\infty} c_n (x - c)^n$$

### 2. Radius of Convergence $R$
Found using the Ratio Test:
$$L = \lim_{n \to \infty} \left| \frac{c_{n+1}(x-c)^{n+1}}{c_n(x-c)^n} \right| = |x - c| \lim_{n \to \infty} \left| \frac{c_{n+1}}{c_n} \right| < 1$$
Thus $R = \frac{1}{\lim |c_{n+1}/c_n|}$.

### 3. Interval of Convergence (IOC)
- Open interval: $(c - R, c + R)$.
- **Crucial Step**: You MUST independently test both endpoints $x = c - R$ and $x = c + R$ using alternating series, p-series, or direct comparison tests.
